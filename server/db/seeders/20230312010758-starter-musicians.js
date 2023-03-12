'use strict';
const {Band, Musician} = require('../models')
const bandMusicians = [
  {
    name: 'The Falling Box',
    musicians: [
      { firstName: 'Adam', lastName: 'Appleby' },
      { firstName: 'Anton', lastName: 'Martinovic' },
      { firstName: 'Wilson', lastName: 'Holt' }
    ]
  },
  {
    name: 'America The Piano',
    musicians: [
      { firstName: 'Marine', lastName: 'Sweet' },
      { firstName: 'Georgette', lastName: 'Kubo' }
    ]
  },
  {
    name: 'Loved Autumn',
    musicians: [
      { firstName: 'Aurora', lastName: 'Hase' }
    ]
  },
  {
    name: 'Playin Sound',
    musicians: [
      { firstName: 'Trenton', lastName: 'Lesley' },
      { firstName: 'Camila', lastName: 'Nenci' }
    ]
  },
  {
    name: 'The King River',
    musicians: [
      { firstName: 'Rosemarie', lastName: 'Affini' },
      { firstName: 'Victoria', lastName: 'Cremonesi' }
    ]
  }
]

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    // for all bands:
    for (const bandMusician of bandMusicians) {
      let {name: bandName, musicians: musiciansOfBand} = bandMusician;
      console.log('bandName, musiciansOfBand' , bandName, musiciansOfBand);      

      let band = await Band.findOne({where: {name: bandName}});
      console.log('band, ', band);
      for (const musicianOfBand of musiciansOfBand) {
        let newMusician = await Musician.create({...musicianOfBand, bandId: band.id });
      }

    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (const bandMusician of bandMusicians) {
      let {name: bandName, musicians: musiciansOfBand} = bandMusician;        

      let band = await Band.findOne({where: {name: bandName}});
      for (const musicianOfBand of musiciansOfBand) {
        await Musician.destroy({where: {bandId: band.id}});
      }
//{id: musicianOfBand.id}
    }
  }
};
