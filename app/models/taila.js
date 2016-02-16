module.exports = function (taila, Seq) {
  
  taila
    .field('id', Seq.PRIMARY)
    .field('is_active', Seq.BOOLEAN)
    .field('phone_number', Seq.STRING(15))
    .field('first_name', Seq.STRING(35))
    .field('last_name', Seq.STRING(35))
    .field('address', Seq.STRING(350))
    .field('location', Seq.ENUM('KADUNA', 'ABUJA', 'KANO'))
}