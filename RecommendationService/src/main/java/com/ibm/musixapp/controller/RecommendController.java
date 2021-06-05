package com.ibm.musixapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.musixapp.exception.RecommendationListEmpty;
import com.ibm.musixapp.exception.SongNameDoesnotExistsException;
import com.ibm.musixapp.exception.SongNotExistsException;
import com.ibm.musixapp.model.RecomUser;
import com.ibm.musixapp.model.Recommend;
import com.ibm.musixapp.service.RecomService;
import com.ibm.musixapp.service.RecommendService;

@CrossOrigin
@RestController
@RequestMapping("/recommend")
public class RecommendController {

	@Autowired
	private RecommendService recs;
	@Autowired
	private RecomService rec;

	@PostMapping("/recommendSong")
	public ResponseEntity<?> saveSong(@RequestBody RecomUser b) {
		ResponseEntity<?> rs = null;
		try {
			RecomUser bk = rec.saveModel(b);
			if (bk != null)
				rs = ResponseEntity.status(HttpStatus.CREATED).build();
			else
				rs = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		} catch (Exception e) {
			rs = ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		return rs;
	}
//	@GetMapping("/getAllRecom")
//	public ResponseEntity<?> recommendAll() {
//		ResponseEntity<?> rs = null;
//		try {
//			List<Recommendation> blist = recs.findALL();
//			rs = ResponseEntity.status(HttpStatus.OK).body(blist);
//		} catch (RecommendationListEmpty e) {
//			rs = ResponseEntity.status(HttpStatus.CONFLICT).build();
//
//		}
//		return rs;
//	}
//
	@GetMapping("/getrecommendSong/{username}")
	public ResponseEntity<?> getSong(@PathVariable("username") String username) throws Exception {
		ResponseEntity<?> rs = null;
		try {
			List<RecomUser> b = rec.getModelByEmail(username);
			System.out.println(b);
			rs = ResponseEntity.status(HttpStatus.OK).body(b);
		} catch (Exception e) {
			rs = ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		return rs;
	}
//
//	@PostMapping("/removeSong")
//	public ResponseEntity<?> removeSong(@RequestBody Recommend rec) throws SongNotExistsException {
//		ResponseEntity<?> rs = null;
//		try {
//			Recommend bk = recs.removeModel(rec);
//			if (bk != null)
//				rs = ResponseEntity.status(HttpStatus.CREATED).build();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		return rs;
//	}
	@GetMapping("/getAllRecom")
	public ResponseEntity<?> recommendAll() {
		ResponseEntity<?> rs = null;
		try {
			List<Recommend> blist = recs.findALL();
			rs = ResponseEntity.status(HttpStatus.OK).body(blist);
		} catch (RecommendationListEmpty e) {
			rs = ResponseEntity.status(HttpStatus.CONFLICT).build();

		}
		return rs;
	}
	@PostMapping("/addRecom")
	public ResponseEntity<?> saveRecommendationcount(@RequestBody Recommend mf) throws SongNameDoesnotExistsException {
		ResponseEntity<?> rs = null;
		try {
			Recommend bk = recs.saveRecom(mf);
			if (bk != null)
				rs = ResponseEntity.status(HttpStatus.CREATED).build();
			else
				rs = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

		} catch (SongNameDoesnotExistsException e) {
			rs = ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		return rs;

	}
	@DeleteMapping("/delete/{songName}")
	public void deleteAlbum(@PathVariable String songName) {
        recs.deleteAlbum(songName);
	}
	
	@PostMapping("/removeSong")
	public ResponseEntity<?>  remove(@RequestBody RecomUser b ) throws SongNotExistsException {
		ResponseEntity<?> rs = null;
		
		try {
			RecomUser bk =rec.removeModel(b);
			if (bk != null)
				rs = ResponseEntity.status(HttpStatus.CREATED).build();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return rs;
		}
        
	}
