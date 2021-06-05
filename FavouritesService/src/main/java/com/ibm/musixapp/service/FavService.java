package com.ibm.musixapp.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.musixapp.exception.SongAlreadyExistsException;
import com.ibm.musixapp.exception.SongNotExistsException;
import com.ibm.musixapp.model.Favourite;
import com.ibm.musixapp.repository.FavRepository;
@Service
public class FavService {
	@Autowired
private FavRepository fr;

public Favourite saveModel(Favourite m) throws SongAlreadyExistsException {
	Optional<Favourite> op=fr.findByUsernameAndUrl(m.getUsername(),m.getUrl());
	if(op.isPresent())
	{
		 throw new SongAlreadyExistsException();
	}
	else
	{
	Favourite bk=fr.save(m);
	return bk;
	}

}

public List<Favourite> getModelByEmail(String user)throws Exception 
{

	List<Favourite> l=fr.findAllByUsername(user);
	return l;
}

public Favourite removeModel(Favourite m) throws SongNotExistsException{
	//Optional<Model> op=fr.findByUrl(m.getUrl());
	/*
	 * if(op.isPresent()) { fr.delete(m); }
	 * 
	 */
	Favourite fav= fr.deleteByUsernameAndUrl(m.getUsername(),m.getUrl());
	return fav;
	 
}}

