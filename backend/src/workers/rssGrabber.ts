import Parser from 'rss-parser';
import postModel from '../models/post.model';
import rssFeedStatusModel from '../models/rssfeed.model';
import connectDB from '../config/db';

const parser = new Parser<{ image: string }>({
  customFields: {
    item: [['media:thumbnail', 'image']]
  }
});

const grabRSS = async () => {
  try {
    const feed = await parser.parseURL('https://lifehacker.com/rss');

    const rssFeedStatus = await rssFeedStatusModel.findOne({});

    const lastPubDate = rssFeedStatus?.lastUpdate
      ? new Date(rssFeedStatus.lastUpdate).getTime()
      : 0;

    const posts = feed.items
      .filter((item) => item.isoDate && new Date(item.isoDate).getTime() > lastPubDate)
      .map((item) => ({
        title: item.title,
        image: item.image.$.url,
        content: item.contentSnippet,
        url: item.link,
        date: item.isoDate,
        creator: item.creator,
        tags: item.categories
      }));

    if (posts.length) {
      await postModel.insertMany(posts);
      if (posts[0].date) {
        await rssFeedStatusModel.updateOne(
          {},
          { $set: { lastUpdate: new Date(posts[0].date).toISOString() } },
          { upsert: true }
        );
      }
    }
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  } finally {
    setTimeout(grabRSS, Number(process.env.RSS_POLLING_TIME) ?? 300000);
  }
};

connectDB().then(() => grabRSS());
