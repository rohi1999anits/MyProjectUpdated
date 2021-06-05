package com.ibm.musixapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.musixapp.exception.SongAlreadyExistsException;
import com.ibm.musixapp.exception.SongNotExistsException;
import com.ibm.musixapp.model.RecomUser;
//import com.ibm.musixapp.model.Recommend;
import com.ibm.musixapp.repository.RecomRepository;
//import com.ibm.musixapp.repository.RecommendRepository;

@Service
public class RecomService {
	@Autowired
	private RecomRepository rr;

	public RecomUser saveModel(RecomUser m) throws SongAlreadyExistsException {
		Optional<RecomUser> op = rr.findByUsernameAndUrl(m.getUsername(), m.getUrl());
		if (op.isPresent()) {
			throw new SongAlreadyExistsException();
		} else {
			RecomUser bk = rr.save(m);
			return bk;
		}

	}

	public List<RecomUser> getModelByEmail(String user) throws Exception {

		List<RecomUser> l = rr.findAllByUsername(user);
		return l;
	}
	public RecomUser removeModel(RecomUser recom) throws SongNotExistsException {
		RecomUser fav = rr.deleteByUsernameAndUrl(recom.getUsername(), recom.getUrl());
		return fav;

	}

}
