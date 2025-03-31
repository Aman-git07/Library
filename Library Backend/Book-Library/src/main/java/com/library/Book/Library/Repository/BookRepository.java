package com.library.Book.Library.Repository;

import com.library.Book.Library.Model.BookItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<BookItem, Long> {

}
