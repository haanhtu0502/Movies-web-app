const apiConfig={
    baseUrl:'https://api.themoviedb.org/3/',
    apiKey:'757cc0610874fd13c1168504f52e30ab',
    originalImage:(imgPath)=>`https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image:(imgPath)=>`https://image.tmdb.org/t/p/w500/${imgPath}`

}

export default apiConfig;