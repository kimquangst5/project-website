const mongoose = require('mongoose');
const { Schema } = mongoose;
const themeSettingsSchema = new Schema({
  primaryColor: String,
  secondaryColor: String,
  fontFamily: String,
  logoUrl: String,
  headerHtml: String,
  footerHtml: String,
  homeLayout: String
});

const ThemeSettings = mongoose.model('ThemeSettings', themeSettingsSchema, 'theme_settings');

module.exports = ThemeSettings;