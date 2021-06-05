package com.ibm.musixapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ibm.musixapp.model.RecomUser;

public interface RecomRepository extends MongoRepository<RecomUser, String> {
	List<RecomUser> findAllByUsername(String username);
	//
	Optional<RecomUser> findByUsernameAndUrl(String username, String url);
	RecomUser deleteByUsernameAndUrl(String username, String url);
}
