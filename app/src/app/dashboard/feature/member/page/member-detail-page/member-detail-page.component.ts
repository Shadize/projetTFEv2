import {Component, computed, inject, Input, OnInit, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemberService} from '../../service';
import {ApiService} from '@api';

@Component({
  selector: 'app-member-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss']
})
export class MemberDetailPageComponent implements OnInit {
  @Input() id!: string;
  readonly memberService = inject(MemberService);
  detail$: Signal<string> = computed(() => this.memberService.list$().find(m => m === this.id) || 'not found');

  private readonly api: ApiService = inject(ApiService);

  ngOnInit(): void {
  }

}
