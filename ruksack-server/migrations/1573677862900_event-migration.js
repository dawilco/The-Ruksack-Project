/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('events', {
        id: 'id',
        name: { type: 'varchar(1000)', notNull: true },
        date: { type: 'date'},
        notes: { type: 'varchar(100)'},
        createdAt: {
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp')
        },
        lastUpdatedAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('events');
};
