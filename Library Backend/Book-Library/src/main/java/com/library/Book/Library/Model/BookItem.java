package com.library.Book.Library.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class BookItem {

    private Long id;
    @NotBlank(message = "Book title can not be blank")
    private String name;
    private String author;
    private String genre;
    private boolean status;

    public BookItem() {
    }

    public BookItem(String genre, String author, String name, Long id, boolean status) {
        this.genre = genre;
        this.author = author;
        this.name = name;
        this.id = id;
        this.status = status;
    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
