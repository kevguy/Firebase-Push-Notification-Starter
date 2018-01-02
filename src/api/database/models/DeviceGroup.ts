import * as mongoose from 'mongoose';

export type DeviceGroupModel = mongoose.Document & {
  deviceGroup: string,
  userId: string,
  tokens: Array<string>
};

const deviceGroupSchema = new mongoose.Schema({
  deviceGroup: String,
  userId: String,
  tokens: [String]
}, { timestamps: true });

const DeviceGroup = mongoose.model('DeviceGroup', deviceGroupSchema);
export default DeviceGroup;
