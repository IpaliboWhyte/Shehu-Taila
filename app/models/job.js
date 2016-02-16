/* This is the booking model which will encapsulate 
 * all information for a job which will be assigned to
 * Taila
 */

module.exports = function(job, Seq) {

  job
    .field('id', Seq.PRIMARY)
    .field('size', Seq.STRING(2))
    .field('measurement_id', Seq.STRING(100))
    .field('location', Seq.ENUM('KADUNA', 'ABUJA', 'KANO'))

  job.belongsTo('taila', {
    as: 'taila',
    foreignKey: 'taila_id'
  });

};