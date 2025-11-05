const admin = require('./firebase');

// Référence à Firestore
const db = admin.firestore();

// Configuration Firestore
db.settings({
  timestampsInSnapshots: true
});

console.log('✅ Firestore connecté');

module.exports = db;