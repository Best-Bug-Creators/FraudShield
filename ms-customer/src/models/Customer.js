import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  id: { type: String },
  personalData: {
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    monthlyIncome: { type: mongoose.Types.Decimal128, required: true },
  },
  address: {
    publicPlace: { type: String, required: true },
    number: { type: String, required: true },
    aditionalInfos: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  cardData: {
    name: { type: String, required: true },
    number: { type: String, required: true },
    expirationDate: { type: Date, required: true },
    cvv: { type: String, required: true },
    invoiceExpirationDate: { type: Date, required: true },
  },
}, { versionKey: false });

const Customer = mongoose.model('customers', customerSchema);

export default Customer;
