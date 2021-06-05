# Team-7 Musix App

## Front-end MusixUI

1. Milestone 1
- Create REST API to fetch data
- Create a static view. This view should have angular route path as /my-recommendations.
- It should contain two sections:
    - Search section
    - Recommendation section
- Create a search bar with a search button to search musix by artist/playlist.
- Search section will have text field with ID #search-text-field
- A button to submit search text field content with ID #search-button
- On submission of search text should query the results from last.fm or napster.com and display search results.
- Get the results displayed in search results section.
- Give an id #search-results to search result section.
- Search results should show a series of card like components and a card should have the following attributes.
- Assign .musix-card class to each playlist cards and all the playlist cards displayed in all sections should have the below details with attributes.
    - assign .musix-track class to describe track name.
    - assign .musix-artist class to describe artist.
    - assign .musix-image class to show image.
    - toggle .recommend & .unrecommend classes to recommend and unrecommend buttons.
- Create a recommend button attached with every playlist card. Give recommend button a class .recommend
- Click on Recommend button and the button should change to Unrecommend.
- The Unrecommend button should have a class .unrecommend and Recommend button should have class .recommend.
- View recommended palylist under my-recommendations section
- Display all recommended palylist in this section. Recommended playlist should be displayed under my-recommendations section.
- Unrecommend button, button should change to Recommend again, playlist should disappear from my-recommendations section

2. Milestone 2
- Create a Dashboard view (Angular Route /dashboard) with three sections Display Favorite Playlist, countries(playlist from different countries), recommendations for a playlist from napster.com/last.fm one under the other.
- This Dashboard is the default view to be shown.
- The 3 sections are:
    - Favorite with Id #Favorite.
    - Countries with ID #Countries.
    - Recommended tracks with ID #recommended
- View all Favorite tracks/playlist cards under Favorite section
- Display all Countries tracks/playlist under Countries section
- View all playlist/tracks recommendations from 3rd party tracks service provider (NAPSTER API/last.fm) under recommendations section
- Sample API links : 
        http://api.napster.com/v2.2/artists/Art.28463069?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4
        
        http://api.napster.com/v2.2/albums/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4