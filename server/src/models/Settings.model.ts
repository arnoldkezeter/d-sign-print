import { Schema, model, type Document } from "mongoose";

export interface SettingsDocument extends Document {
  companyName: string;
  tagline: string;
  logoUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  businessHours: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  mapUrl: string;
}

// Un seul document existera jamais dans cette collection (singleton applicatif) :
// on identifie systématiquement les paramètres du site par la clé "site_settings".
const settingsSchema = new Schema<SettingsDocument>(
  {
    companyName: { type: String, default: "D-sign Print" },
    tagline: { type: String, default: "Votre partenaire design & impression au Cameroun" },
    logoUrl: { type: String, default: "" },
    email: { type: String, default: "contact@dsignprint.com" },
    phone: { type: String, default: "+237 6 00 00 00 00" },
    whatsapp: { type: String, default: "+237600000000" },
    address: { type: String, default: "" },
    city: { type: String, default: "Douala" },
    businessHours: { type: String, default: "Lun - Sam : 8h00 - 18h00" },
    facebookUrl: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    mapUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const SettingsModel = model<SettingsDocument>("Settings", settingsSchema);
