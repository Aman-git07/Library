package com.library.Book.Library.Contoller;

import com.library.Book.Library.Model.BookItem;
import com.library.Book.Library.Repository.BookRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/library")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<BookItem> findAll(){
        return bookRepository.findAll();
    }

    @PostMapping
    public BookItem save(@Valid @RequestBody BookItem bookItem){
        return bookRepository.save(bookItem);
    }

    @PutMapping
    public BookItem update (@Valid @NotNull @RequestBody BookItem bookItem){
        return bookRepository.save(bookItem);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable Long id){
        bookRepository.deleteById(id);
    }
}
