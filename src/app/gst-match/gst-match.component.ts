import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from '../business.service';
import MatchResult from '../MatchResult';
import InfoTeam from '../InfoTeam';
import ProgressTeam from '../ProgressTeam';
import ProgressPlayer from '../ProgressPlayer';
import Player from '../Player';

@Component({
  selector: 'app-gst-match',
  templateUrl: './gst-match.component.html',
  styleUrls: ['./gst-match.component.css']
})
export class GstMatchComponent implements OnInit {

  match: MatchResult;
  matchForm: FormGroup;
  infoTeam: InfoTeam;
  teams: String[];
  progressTeams: ProgressTeam[];
  progressPlayers: ProgressPlayer[];
  progressPlayersCAS: ProgressPlayer[];
  progressPlayersPASS: ProgressPlayer[];
  matchList: MatchResult[];
  players: Player[];
  solved: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bs: BusinessService,
    private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.matchForm = this.fb.group({
      jornada: [, Validators.required],
      equipoLocal: [, Validators.required],
      tantosLocal: [, Validators.required],
      bajasCausadasPorLocal: [, Validators.required],
      pasesLocal: [, Validators.required],
      intercepcionesLocal: [, Validators.required],
      ingresosLocal: [, Validators.required],
      equipoVisitante: [, Validators.required],
      tantosVisitante: [, Validators.required],
      bajasCausadasPorVisitante: [, Validators.required],
      pasesVisitante: [, Validators.required],
      intercepcionesVisitante: [, Validators.required],
      ingresosVisitante: [, Validators.required],
      comment: [, Validators.required],
      updated: [, Validators.required]
    });
  }

  ngOnInit() {
    this.match = new MatchResult();
    this.match.jornada = 0;
    this.match.equipoLocal = 0;
    this.match.tantosLocal = 0;
    this.match.bajasCausadasPorLocal = 0;
    this.match.pasesLocal = 0;
    this.match.intercepcionesLocal = 0;
    this.match.ingresosLocal = 0;
    this.match.equipoVisitante = 0;
    this.match.tantosVisitante = 0;
    this.match.bajasCausadasPorVisitante = 0;
    this.match.pasesVisitante = 0;
    this.match.intercepcionesVisitante = 0;
    this.match.ingresosVisitante = 0;
    this.match.comment = '';

    this.solved = 0;

    this.teams = [];
    this.progressTeams = [];
    for (let i = 0; i < 8 ; i++) {
      this.progressTeams[i] = new ProgressTeam();
    }
    this.progressPlayers = [];
    this.progressPlayersCAS = [];
    this.progressPlayersPASS = [];

    this.getNameTeam('CarlosD', 0, 50);
    this.getNameTeam('Carlos', 1, 50);
    this.getNameTeam('Isra', 2, 50);
    this.getNameTeam('Ferran', 3, 60);
    this.getNameTeam('Vicente', 4, 70);
    this.getNameTeam('Kaja', 5, 50);
    this.getNameTeam('Luis', 6, 60);
    this.getNameTeam('Javi', 7, 60);
  }

  prepareClasification() {
    this.bs
    .getMatchList()
    .subscribe((data: MatchResult[]) => {
      this.matchList = data;
      this.matchList.sort((a, b) => a.jornada - b.jornada);
      for (let i = 0; i < this.matchList.length ; i++) {
        const localId = this.getIdByNameTeam(this.matchList[i].equipoLocal);
        const visitorId = this.getIdByNameTeam(this.matchList[i].equipoVisitante);
        this.progressTeams[localId].playedGames += 1;
        this.progressTeams[visitorId].playedGames += 1;
        this.progressTeams[localId].td = this.matchList[i].tantosLocal;
        this.progressTeams[localId].tdOpponent = this.matchList[i].tantosVisitante;
        this.progressTeams[visitorId].td = this.matchList[i].tantosVisitante;
        this.progressTeams[visitorId].tdOpponent = this.matchList[i].tantosLocal;

         if (+this.matchList[i].tantosLocal > +this.matchList[i].tantosVisitante) {
            this.progressTeams[localId].victoryPoints += 3;
            this.progressTeams[localId].victories += 1;
            this.progressTeams[visitorId].defeats += 1;
         }
         if (+this.matchList[i].tantosLocal < +this.matchList[i].tantosVisitante) {
            this.progressTeams[visitorId].victoryPoints += 3;
            this.progressTeams[localId].defeats += 1;
            this.progressTeams[visitorId].victories += 1;
         }
         if (+this.matchList[i].tantosLocal === +this.matchList[i].tantosVisitante) {
            this.progressTeams[visitorId].victoryPoints += 1;
            this.progressTeams[localId].victoryPoints += 1;
         }
      }
      this.progressTeams.sort((a, b) => b.victoryPoints - a.victoryPoints);
    });
    this.progressPlayers.sort((a, b) => b.td - a.td);
    this.progressPlayersCAS.sort((a, b) => b.cas - a.cas);
    this.progressPlayersPASS.sort((a, b) => b.pass - a.pass);
  }

  createMatchResult(jornada, equipoLocal, tantosLocal, bajasCausadasPorLocal, pasesLocal, intercepcionesLocal, ingresosLocal,
    equipoVisitante, tantosVisitante, bajasCausadasPorVisitante, pasesVisitante, intercepcionesVisitante, ingresosVisitante,
    comment) {
    this.bs.createMatchResult(jornada, equipoLocal, tantosLocal, bajasCausadasPorLocal, pasesLocal, intercepcionesLocal, ingresosLocal,
      equipoVisitante, tantosVisitante, bajasCausadasPorVisitante, pasesVisitante, intercepcionesVisitante, ingresosVisitante,
      comment);
    this.router.navigate(['/']).then(() => {
    });
  }

  getIdByNameTeam(teamName: String) {
    for (let i = 0; i < this.progressTeams.length ; i++) {
      if ( this.progressTeams[i].name === teamName) {
        return i;
      }
    }
  }

  getNameTeam(coach: String, position: number, rerollCost: number) {
    this.progressTeams[position].victoryPoints = 0;
    this.progressTeams[position].playedGames = 0;
    this.progressTeams[position].victories = 0;
    this.progressTeams[position].defeats = 0;
    this.progressTeams[position].td = 0;
    this.progressTeams[position].tdOpponent = 0;
    this.bs
      .getInfoTeam(coach)
      .subscribe((data: InfoTeam) => {
        this.teams.push(data[0].teamName);
        this.progressTeams[position].name = data[0].teamName;
        this.progressTeams[position].value = data[0].rerolls * rerollCost + (data[0].fanFactor - 5) * 10 +
                             data[0].assitant * 10 + data[0].cheerleaders * 10 + data[0].apothecary * 50;
        this.bs
              .getPlayers(coach)
              .subscribe((dataP: Player[]) => {
                this.players = dataP;
                this.players = this.players.filter(isLastVersionAndReady);
                for (let i = 0; i < this.players.length ; i++) {
                  this.progressTeams[position].value =  +this.progressTeams[position].value + +this.players[i].cost;
                  if (this.players[i].TD > 0 || this.players[i].CAS > 0 || this.players[i].COMP) {
                    if (this.players[i].TD > 0) {
                      this.progressPlayers.push(new ProgressPlayer());
                      this.progressPlayers[this.progressPlayers.length - 1].name = this.players[i].name;
                      this.progressPlayers[this.progressPlayers.length - 1].teamName = this.progressTeams[position].name;
                      this.progressPlayers[this.progressPlayers.length - 1].td = this.players[i].TD;
                    }
                    if (this.players[i].CAS > 0) {
                      this.progressPlayersCAS.push(new ProgressPlayer());
                      this.progressPlayersCAS[this.progressPlayersCAS.length - 1].name = this.players[i].name;
                      this.progressPlayersCAS[this.progressPlayersCAS.length - 1].teamName = this.progressTeams[position].name;
                      this.progressPlayersCAS[this.progressPlayersCAS.length - 1].cas = this.players[i].CAS;
                    }
                    if (this.players[i].COMP > 0) {
                      this.progressPlayersPASS.push(new ProgressPlayer());
                      this.progressPlayersPASS[this.progressPlayersPASS.length - 1].name = this.players[i].name;
                      this.progressPlayersPASS[this.progressPlayersPASS.length - 1].teamName = this.progressTeams[position].name;
                      this.progressPlayersPASS[this.progressPlayersPASS.length - 1].pass = this.players[i].COMP;
                    }
                  }
                }
                this.solved += 1;
                if (this.solved === 8) {
                  this.prepareClasification();
                }
            });
      });

      function isLastVersionAndReady(element, index, array) {
        return (element.updated == null && element.id > 0 && element.missesNextMatch === 'N');
      }
  }
}
