import mongoose from 'mongoose';  // Import mongoose using ES module syntax

const appointmentSchema = new mongoose.Schema({
    appointmentTitle: { type: String, required: true },
    swineType: { type: String, required: true },
    swineCount: { type: String, required: true },
    
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    swineSymptoms: { type: String, required: true },
    swineAge: { type: String, required: true },
    swineMale: { type: String, required: true },
    swineFemale: { type: String, required: true },

    municipality: { type: String, required: true },
    barangay: { type: String, required: true },

    clientName: { type: String, required: true },
    clientContact: { type: String, required: true },
    clientEmail: { type: String, required: true },

    appointmentStatus: { type: String, default: 'pending' },
    vetPersonnel: { type: String, default: 'Not Set' },
    medicine: { type: String, default: 'Not Set' },
    dosage: { type: String, default: 'Not Set' },
    vetMessage: { type: String, default: 'No message yet' }

}, { collection: 'appointment_tbl' });

export default mongoose.model('AppointmentRequest', appointmentSchema);  // Use ES export syntaxd'/er4/;"
// 