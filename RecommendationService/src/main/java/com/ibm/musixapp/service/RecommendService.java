package com.ibm.musixapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.musixapp.exception.SongAlreadyExistsException;
import com.ibm.musixapp.exception.SongNameDoesnotExistsException;
import com.ibm.musixapp.exception.SongNotExistsException;
import com.ibm.musixapp.model.Recommend;
import com.ibm.musixapp.repository.RecommendRepository;
import com.ibm.musixapp.exception.RecommendationListEmpty;

@Service
public class RecommendService {
	@Autowired
	private RecommendRepository rr;

	public List<Recommend> findALL() throws RecommendationListEmpty {
		List<Recommend> culist = rr.findAll();
		if (culist.isEmpty())
			throw new RecommendationListEmpty();
		return culist;
	}

	
	public Recommend saveRecom(Recommend mf) throws SongNameDoesnotExistsException {
		System.out.println("Inside recommendation");
		Optional<Recommend> o = rr.findById(mf.getArtistSongName());
		Recommend rm = new Recommend();
		if (o.isPresent()) {
			Recommend r = o.get();
			rm.setArtistSongName(r.getArtistSongName());
			rm.setRecommendationCount(r.getRecommendationCount() + 1);
			rm.setAlbumSingle(r.getAlbumSingle());
			rm.setArtist_name(r.getArtist_name());
			rm.setImage(r.getImage());
			rm.setTrackSingle(r.getTrackSingle());
			rm.setUrl(r.getUrl());

		} else {
			rm.setArtistSongName(mf.getArtistSongName());
			rm.setRecommendationCount(1);
			rm.setAlbumSingle(mf.getAlbumSingle());
			rm.setArtist_name(mf.getArtist_name());
			rm.setImage(mf.getImage());
			rm.setTrackSingle(mf.getTrackSingle());
			rm.setUrl(mf.getUrl());
		}
		System.out.println("Showing object");
		System.out.println(rm.toString());
		Recommend rs = rr.save(rm);//if recom is not there it will create a recom otherwise it will update a recom
		return rs;
	}
//	public Optional<Recommend> removeModel(Recommend recom) throws SongNotExistsException {
//		System.out.println("inside service of remove");
//	Optional<Recommend> fav = rr.deleteBySongNameAndUrl(recom.getArtistSongName(),recom.getUrl());
//	return fav;
//
//}
	public void deleteAlbum(String songName) {
		rr.deleteById(songName);
	}
}
