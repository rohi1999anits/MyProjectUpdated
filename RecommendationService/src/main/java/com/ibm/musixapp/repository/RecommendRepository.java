package com.ibm.musixapp.repository;

//import java.util.List;
//import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

//import com.ibm.musixapp.model.RecomUser;
import com.ibm.musixapp.model.Recommend;

public interface RecommendRepository extends MongoRepository<Recommend, String> {
	//Optional<Recommend> findByUsername(String username);

//	List<RecomUser> findAllByUsername(String username);
//
//	Optional<RecomUser> findByUsernameAndUrl(String username, String url);

	//Optional<Recommend> deleteBySongNameAndUrl(String artistSongName,String url);
}

