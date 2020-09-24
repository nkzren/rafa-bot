const config = require('../config.js'); // Fix path to absolute from root
const PermissionLevels = [
  {
    level: 0,
    name: 'User',
    check: () => true,
  },
  {
    level: 2,
    name: 'Moderator',
    check: (message) => {
      try {
        const modRole = message.guild.roles.find((role) => role.name.toLowerCase() === config.moderator.toLowerCase());
        return modRole && message.member.roles.has(modRole.id)
      } catch (e) {
        return false;
      }
    }
  },
  {
    level: 3,
    name: 'Admin',
    check: (message) => {
      try {
        const admRole = message.guild.roles.find((role) => role.name.toLowerCase() === config.admin.toLowerCase());
        return admRole && message.member.roles.has(admRole.id);
      } catch (e) {
        return false;
      }
    }
  },
  {
    level: 4,
    name: 'Owner',
    check: (message) => {
      return message.guild.ownerID === message.member.id;
    }
  }
]

module.exports = PermissionLevels;
