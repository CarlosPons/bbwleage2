import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate, getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  uri = 'https://api.mlab.com/api/1/databases/bloodbowl/collections/';
  apikey = '?apiKey=IyaE4OkpVwSI6BphS7oHxnNlhal28oD8';

  constructor(private http: HttpClient) { }

  getPlayers(coach) {
    return this
      .http
      .get(`${this.uri}Equipo${coach}${this.apikey}`);
  }

  getInfoTeam(coach) {
    return this
      .http
      .get(`${this.uri}Info${coach}${this.apikey}`);
  }

  getMatchList() {
    return this
    .http
    .get(`${this.uri}EncuentroGlobal2${this.apikey}`);
  }

  createMatchResult(jornada, equipoLocal, tantosLocal, bajasCausadasPorLocal, pasesLocal, intercepcionesLocal, ingresosLocal,
              equipoVisitante, tantosVisitante, bajasCausadasPorVisitante, pasesVisitante, intercepcionesVisitante, ingresosVisitante,
              comment) {
    const obj = {
      jornada: jornada,
      equipoLocal: equipoLocal,
      tantosLocal: tantosLocal,
      bajasCausadasPorLocal: bajasCausadasPorLocal,
      pasesLocal: pasesLocal,
      intercepcionesLocal: intercepcionesLocal,
      ingresosLocal: ingresosLocal,
      equipoVisitante: equipoVisitante,
      tantosVisitante: tantosVisitante,
      bajasCausadasPorVisitante: bajasCausadasPorVisitante,
      pasesVisitante: pasesVisitante,
      intercepcionesVisitante: intercepcionesVisitante,
      ingresosVisitante: ingresosVisitante,
      comment: comment,
      updated: Date.now().toString
    };
    this
      .http
      .post(`${this.uri}EncuentroGlobal2${this.apikey}`, obj);
  }

  updateInfoTeam(coach, _id, teamName, race,
    treasury, coachFullName, rerolls,
    fanFactor, assitant, cheerleaders,
    apothecary, wizard, comment) {
    const obj = {
      teamName: teamName,
      race: race,
      treasury: treasury,
      coachFullName: coachFullName,
      rerolls: rerolls,
      fanFactor: fanFactor,
      assitant: assitant,
      cheerleaders: cheerleaders,
      apothecary: apothecary,
      wizard: wizard,
      comment: comment,
      updated: Date.now().toString
    };
    this
      .http
      .put(`${this.uri}Info${coach}/${_id}${this.apikey}`, obj)
      .subscribe(res => console.log('Done'));
  }

  createBasicPlayer(coach, position,
          MA, ST, AG, AV, skills,
          COMP, TD, INT, CAS, MVP, cost) {
      const obj = {
      id: 0,
      name : '<Sin nombre todavía>' ,
      position : position ,
      MA : MA ,
      ST : ST ,
      AG : AG ,
      AV : AV ,
      skills : skills ,
      COMP : COMP ,
      TD : TD ,
      INT : INT ,
      CAS : CAS ,
      MVP : MVP ,
      cost : cost ,
      comment : '<Cambiad número dorsal>',
      updated: null,
      missesNextMatch: 'N'
      };
      this
      .http
      .post(`${this.uri}Equipo${coach}${this.apikey}`, obj)
      .subscribe(res => console.log('Done - POST'));
    }

  updatePlayer(coach, _id, id, name, position,
               MA, ST, AG, AV, skills,
               COMP, TD, INT, CAS, MVP, cost, comment, missesNextMatch) {
    const obj = {
      id: id,
      name : name ,
      position : position ,
      MA : MA ,
      ST : ST ,
      AG : AG ,
      AV : AV ,
      skills : skills ,
      COMP : COMP ,
      TD : TD ,
      INT : INT ,
      CAS : CAS ,
      MVP : MVP ,
      cost : cost ,
      comment : comment,
      missesNextMatch: missesNextMatch,
      updated: new Date(Date.now() + 2 * 3600 * 1000)
    };
    this
    .http
      .post(`${this.uri}Equipo${coach}${this.apikey}`, obj)
      .subscribe(res => console.log('Done'));
    obj.updated = null;
    this
      .http
      .put(`${this.uri}Equipo${coach}/${_id}${this.apikey}`, obj)
      .subscribe(res => console.log('Done'));
  }
}
