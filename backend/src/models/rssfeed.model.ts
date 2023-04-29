import { getModelForClass, prop } from '@typegoose/typegoose';

class Rssfeed {
  @prop({ required: true })
  lastUpdate!: string;
}

const rssfeedModel = getModelForClass(Rssfeed);

export default rssfeedModel;
