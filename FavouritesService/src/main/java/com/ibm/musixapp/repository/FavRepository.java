package com.ibm.musixapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.musixapp.model.Favourite;



public interface FavRepository extends MongoRepository<Favourite,Integer> {
	Optional<Favourite> findByUsername(String username);
	List<Favourite> findAllByUsername(String username);
	Optional<Favourite> findByUsernameAndUrl(String username,String url);
    Favourite deleteByUsernameAndUrl(String username,String url );
}
