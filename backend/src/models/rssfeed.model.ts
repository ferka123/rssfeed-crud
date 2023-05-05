import { Schema, model } from 'mongoose';

interface IRssFeedStatus {
  lastUpdate: string;
}

const rssFeedSchema = new Schema<IRssFeedStatus>({
  lastUpdate: { type: String, required: true }
});

const RssFeedStatusModel = model<IRssFeedStatus>('RssFeedStatus', rssFeedSchema);

export default RssFeedStatusModel;
