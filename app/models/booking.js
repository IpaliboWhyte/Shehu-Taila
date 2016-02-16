/* This is the booking model which will encapsulate all information for a user */

module.exports = function(booking, Seq){

  booking
    .field('id', Seq.PRIMARY)
    .field('type', Seq.ENUM('OCCASIONAL', 'CASUAL'))
    .field('username', Seq.STRING(50))
    .field('size', Seq.STRING(2))
    .field('description', Seq.STRING(300))
    .field('devilvery_type', Seq.ENUM('EXPEDITED', 'REGULAR'))
    .field('material_id', Seq.STRING(50))
    .field('style_id', Seq.STRING(100))
};