import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import Player from '../Player';
import InfoTeam from '../InfoTeam';
import { BusinessService } from '../business.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  players: Player[];
  infoTeam: InfoTeam;
  infoTeamForm: FormGroup;
  coach: String;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bs: BusinessService,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
    }

  createForm() {
    this.infoTeamForm = this.fb.group({
        teamName: ['', Validators.required ],
        race: ['', Validators.required ],
        treasury: ['', Validators.required ],
        coachFullName: ['', Validators.required ],
        rerolls: ['', Validators.required ],
        fanFactor: ['', Validators.required ],
        assitant: ['', Validators.required ],
        cheerleaders: ['', Validators.required ],
        apothecary: ['', Validators.required ],
        wizard: ['', Validators.required ],
        comment: ['', Validators.required ]
      });
  }

  ngOnInit() {
    this.updateComponent();
  }

  updateInfoTeam(teamName, race,
    treasury, coachFullName, rerolls,
    fanFactor, assitant, cheerleaders,
    apothecary, wizard, comment) {
    this.bs.updateInfoTeam(this.coach, this.infoTeam._id.$oid,
                          teamName, race,
                          treasury, coachFullName, rerolls,
                          fanFactor, assitant, cheerleaders,
                          apothecary, wizard, comment);
  }

  updateComponent() {
    this.route.params.subscribe(params => {
      this.coach = params['coach'];
      this.bs
        .getPlayers(params['coach'])
        .subscribe((data: Player[]) => {
          this.players = data;
          this.players = this.players.filter(isLastVersion);
          this.players = this.players.sort((a, b) => a.id - b.id);
       });
       this.bs
        .getInfoTeam(params['coach'])
        .subscribe((data: InfoTeam) => {
          this.infoTeam = data[0];
        });
    });

    function isLastVersion(element, index, array) {
      return (element.updated == null && element.id > 0);
    }
  }
}
