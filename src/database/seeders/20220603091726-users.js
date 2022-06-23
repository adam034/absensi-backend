'use strict';
const bcrypt = require('bcrypt');
const moment = require('moment');
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = await queryInterface.bulkInsert(
      'roles',
      [
        {
          code: 'RL01',
          description: 'Super Admin',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          code: 'RL02',
          description: 'Admin',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          code: 'RL03',
          description: 'Employee',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
      ],
      {
        returning: true,
      },
    );
    const statuses = await queryInterface.bulkInsert(
      'statuses',
      [
        {
          code: 'ST01',
          description: 'Immutable',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          code: 'R02',
          description: 'Absen',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          code: 'R03',
          description: 'Ontime',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          code: 'R04',
          description: 'Terlambat',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          code: 'R05',
          description: 'Ijin',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          code: 'R06',
          description: 'Dinas Luar (DL)',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
      ],
      { returning: true },
    );
    const agencies = await queryInterface.bulkInsert(
      'agencies',
      [
        {
          code: 'AG01',
          description: 'BKD (Badan Kepegawaian Daerah)',
          address: 'Jl. Pahlawan no 22',
          photo: '-',
          phone: '(0343) 422871',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
      ],
      { returning: true },
    );
    const [superadmin, admin, emp] = roles;
    const [imut, absen, ontime, terlambat, ijin] = statuses;
    const [bkd] = agencies;

    const users = await queryInterface.bulkInsert(
      'users',
      [
        {
          nip: 'superadmin',
          password: bcrypt.hashSync('superadmin', 10),
          role_id: superadmin.role_id,
          agency_id: bkd.agency_id,
          is_active: true,
          status_id: imut.status_id,
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          nip: 'admin',
          password: bcrypt.hashSync('admin', 10),
          role_id: admin.role_id,
          agency_id: bkd.agency_id,
          is_active: true,
          status_id: imut.status_id,
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          nip: '001',
          password: bcrypt.hashSync('user123', 10),
          role_id: emp.role_id,
          agency_id: bkd.agency_id,
          is_active: true,
          status_id: absen.status_id,
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
      ],
      {
        returning: true,
      },
    );
    const [sa, adm, employee] = users;
    const profiles = await queryInterface.bulkInsert('profiles', [
      {
        user_id: sa.user_id,
        full_name: 'Super Admin',
        photo: 'Jln Gajah Mada',
        phone: '08828282828',
        address: 'image',
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD'),
      },
      {
        user_id: adm.user_id,
        full_name: 'Admin',
        photo: 'Jln Gajah Duduk',
        phone: '08823232',
        address: 'image',
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD'),
      },
      {
        user_id: employee.user_id,
        full_name: 'Sukarjono',
        photo: 'Jln Gajah Salto',
        phone: '08823232',
        address: 'image',
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD'),
      },
    ]);
    console.debug(`user created ${users.length}`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users');
    await queryInterface.bulkDelete('profiles');
    await queryInterface.bulkDelete('roles');
    await queryInterface.bulkDelete('agencies');
    await queryInterface.bulkDelete('statuses');
  },
};
