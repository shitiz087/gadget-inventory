import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../utils/api.service';
import { API } from '../../constants/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gadget-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gadget-detail.component.html',
})
export class GadgetDetailComponent implements OnInit {
  gadget: any = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.get(`${API.GADGETS}/${id}`).subscribe((res: any) => {
        this.gadget = res.data;
      });
    }
  }

  goBack() {
    this.router.navigate(['/gadgets']);
  }
}
