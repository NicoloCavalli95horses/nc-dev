export default {
  install(app) {

    // focus input text
    app.directive( 'focus', {
      mounted( el ) {
        setTimeout( () => el.focus(), 200 );
      }
    });
  }
}