let slicedMovies = movies.slice(0, 11);

search.addEventListener('click', e => {
  let finalMovies;

  cards.innerHTML = ''

  // search pattern
  let pattern = new RegExp(`${movieName.value}`, 'gi')

  // filter by movie name
  finalMovies = movies.filter(item => pattern.test(item.title))

  // filter by rating
  let ratingScale = Number(rating.value) ? Number(rating.value) : 0

  if (ratingScale >= 0 && ratingScale <= 10) {
    finalMovies = finalMovies.filter(e => e.imdbRating >= ratingScale)
  } else {
    alert("To'g'ri qiymat kiriting!")
    return
  }

  // filter by category
  let movieCategory = category.value

  if (movieCategory) {
    finalMovies = finalMovies.filter(e => e.categories.includes(movieCategory))
  }

  result.textContent = finalMovies.length

  finalMovies.sort((a, b) => b.imdbRating - a.imdbRating)

  selectType.value == 'down' ? finalMovies.reverse() : finalMovies

  finalMovies.forEach(item => {

    // card
    let CARD = document.createElement('DIV')
    CARD.classList.add('card', 'col-6', 'pt-3')

    // image
    let IMAGE = document.createElement('img')
    IMAGE.width = 400
    IMAGE.height = 180
    IMAGE.classList.add('card-img-top', 'img-fluid')
    IMAGE.src = item.smallThumbnail
    CARD.appendChild(IMAGE)

    // card-body
    let CARDBODY = document.createElement('DIV')
    CARDBODY.classList.add('card-body')

    // movie name
    let MOVIENAME = document.createElement('H4')
    MOVIENAME.classList.add('h4')
    MOVIENAME.textContent = item.title
    CARDBODY.appendChild(MOVIENAME)

    // movie year
    let MOVIEYEAR = document.createElement('H6')
    MOVIEYEAR.classList.add('h6')
    MOVIEYEAR.textContent = item.year
    CARDBODY.appendChild(MOVIEYEAR)

    // movie rating
    let MOVIERATING = document.createElement('H6')
    MOVIERATING.classList.add('h6')
    MOVIERATING.textContent = item.imdbRating
    CARDBODY.appendChild(MOVIERATING)

    // movie categories
    let CATEGORIES = document.createElement('H6')
    CATEGORIES.classList.add('h6')
    CATEGORIES.textContent = item.categories.join(', ').toLowerCase()
    CARDBODY.appendChild(CATEGORIES)

    // trailer
    let TRAILER = document.createElement('a')
    TRAILER.classList.add('btn', 'btn-primary', 'btn-small')
    TRAILER.textContent = 'Trailer'
    TRAILER.target = '_blank'
    TRAILER.href = 'https://youtube.com/watch?v=' + item.youtubeId
    CARDBODY.appendChild(TRAILER)

    // more info
    let MORE = document.createElement('a')
    MORE.classList.add('btn', 'btn-success', 'text-nowrap', 'btn-small', 'mx-2')
    MORE.id = 'modalOpener'
    MORE.textContent = 'More Info'
    CARDBODY.appendChild(MORE)

    // bookmark
    let BOOKMARK = document.createElement('a')
    BOOKMARK.classList.add('btn', 'btn-secondary', 'btn-small')
    BOOKMARK.textContent = 'Bookmark'
    CARDBODY.appendChild(BOOKMARK)

    // add body to card
    CARD.appendChild(CARDBODY)

    cards.appendChild(CARD)
  })

})