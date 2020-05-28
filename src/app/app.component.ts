import { Component } from '@angular/core';

/**
 * Import the Pokedex service.
 */
import { PokedexService } from './pokedex.service';

/**
 * Import the Pokemon class
 */
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  /**
   * The component maintains
   * a list of Pokemon objects
   * that will be rendered.
   *
   * We initialize it to an empty
   * list.
   */
  pokemon: Pokemon[] = [];

  /**
   * A boolean that represents
   * if we are currently loading data.
   */
  isLoading: boolean = false;

  /**
   * This boolean will be set
   * to true if an error occurred.
   */
  error: boolean = false;
   selectedPokemon:Pokemon;
  /**
   * Inject the Pokedex service.
   */
  constructor(private pokedexService: PokedexService) { }

  /**
   * A lifecycle method
   * that is automatically
   * envoked when the component
   * is created.
   */
  ngOnInit() {
    /**
     * Load the initial data.
     */
    this.loadMore(12);
  }

  loadMore(count=6) {
    this.isLoading = true;

    /**
     * Use the Pokedex service
     * to load the next 9 Pokemon.
     */
    this.pokedexService.getPokemon(this.pokemon.length, count)
      .then(pokemon => {
        pokemon = pokemon.map(p => {
          p.imageLoaded = false;
          return p;
        });
                /**
         * If loading was successful
         * we append the result to the list.
         */
        this.pokemon = this.pokemon.concat(pokemon);
        this.isLoading = false;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      });
  }

  selectPokemon(pokemon:Pokemon){
    this.selectedPokemon = pokemon;
    console.log(this.selectedPokemon);

  }
}




























// import { Component, VERSION } from '@angular/core';
// import { PokedexService } from './pokedex.service';

// @Component({
//   selector: 'my-app',
//   templateUrl: './app.component.html',
//   styleUrls: [ './app.component.css' ]
// })
// export class AppComponent  {
  

//   constructor(private pokedexService: PokedexService){}
// }
