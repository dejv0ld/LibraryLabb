module.exports = class books {
  constructor(book_id, author_name, title, genre, year, total_copies, available_copies) {
    this.book_id = book_id;
    this.author_name = author_name;
    this.title = title;
    this.genre = genre;
    this.year = year;
    this.total_copies = total_copies;
    this.available_copies = available_copies;
  }
}
