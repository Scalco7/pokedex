import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  private linkPoke: string = "https://pokeapi.co/api/v2/pokemon/"
  private linkName: string = "https://pokeapi.co/api/v2/pokemon-species/"

  public id: any;
  public infoPoke: any;
  public nameJapan: any;

  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor( private route: ActivatedRoute, private pokeApiService: PokeApiService){
    this.route.params.subscribe(params => this.id = params["id"]);
  }

  ngOnInit(): void {

    const pokemon = this.pokeApiService.ApiGetPokemons(`${this.linkPoke}${this.id}`);
    const name = this.pokeApiService.ApiGetPokemons(`${this.linkName}${this.id}`);

      forkJoin([pokemon, name]).subscribe(
        res => {
          this.infoPoke = res[0]
          this.nameJapan = res[1].names[0].name
          this.isLoading = true
        },
        error => {
          this.apiError = true;
        }
      )
  }

}
