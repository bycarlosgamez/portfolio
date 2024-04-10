// window.addEventListener('load', () => {
//   const messageOnLoad = document.getElementById('loadingMessage');
//   setTimeout(() => {
//     messageOnLoad.classList.add('message-hidden');
//   }, 4000);
// })
/* ******** Menu ******** */
((d) => {
  const $btnMenu = d.querySelector('.menu-btn');
  $menu = d.querySelector('.menu');

  $btnMenu.addEventListener('click', (e) => {
    $btnMenu.firstElementChild.classList.toggle('none');
    $btnMenu.lastElementChild.classList.toggle('none');
    $menu.classList.toggle('is-active');
  });

  d.addEventListener('click', (e) => {
    if (!e.target.matches('.menu a')) return false;

    $btnMenu.firstElementChild.classList.remove('none');
    $btnMenu.lastElementChild.classList.add('none');
    $menu.classList.remove('is-active');
  });
})(document);

/* ******** Form ******** */
((d) => {
  const $form = d.querySelector('.contact-form'),
    $loader = d.querySelector('.contact-form-loader'),
    $response = d.querySelector('.contact-form-response');

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    $loader.classList.remove('none');
    fetch('https://formsubmit.co/ajax/7d3c5666c15d880e1a66a59a5fc5caf7', {
      method: 'POST',
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        location.hash = '#thanks';
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || 'An error has occurred, please try again';
        $response.querySelector(
          'h3'
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $loader.classList.add('none');
        setTimeout(() => {
          location.hash = '#close';
        }, 3000);
      });
  });
})(document);
