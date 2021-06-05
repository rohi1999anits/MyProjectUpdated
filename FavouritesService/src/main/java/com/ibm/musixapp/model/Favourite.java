package com.ibm.musixapp.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="favourites")
public class Favourite {
	
	private String username;
	private String songname;
	private String artist;
	private String url;
	
	



	public Favourite(String username, String songname, String artist, String url) {
		super();
		this.username = username;
		this.songname = songname;
		this.artist = artist;
		this.url = url;
	}

	




	public String getUsername() {
		return username;
	}






	public void setUsername(String username) {
		this.username = username;
	}






	public String getSongname() {
		return songname;
	}






	public void setSongname(String songname) {
		this.songname = songname;
	}






	public String getArtist() {
		return artist;
	}






	public void setArtist(String artist) {
		this.artist = artist;
	}






	public String getUrl() {
		return url;
	}






	public void setUrl(String url) {
		this.url = url;
	}






	public Favourite() {
		super();
		// TODO Auto-generated constructor stub
	}






	@Override
	public String toString() {
		return "Model [username=" + username + ", songname=" + songname + ", artist=" + artist + ", url=" + url + "]";
	}


	
	

}

