import * as mongoose from 'mongoose';

export type DeviceGroup = mongoose.Document & {
  userId: string,
  'zh-hk': Array<string>,
  'en': Array<string>,
};

const deviceGroupSchema = new mongoose.Schema({
  userId: String,
  'zh-hk': [String],
  'en': [String]
}, { timestamps: true });

const DeviceGroup = mongoose.model('DeviceGroup', deviceGroupSchema);
export default DeviceGroup;
