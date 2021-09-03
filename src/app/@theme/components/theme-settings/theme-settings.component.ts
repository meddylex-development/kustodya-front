import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbSidebarService, NbMenuService } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { StateService, LayoutService } from '../../../@core/utils';
import { ProjectService } from '../../../shared/api/services/project.service';
import { VersionService } from '../../../shared/api/services/version.service';
import { PagesComponent } from '../../../pages/pages.component';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
// import { ProjectsComponent } from '../../../pages/projects/projects.component';

declare var $: any;
@Component({
  selector: 'ngx-theme-settings',
  styleUrls: ['./theme-settings.component.scss'],
  templateUrl: './theme-settings.component.html',
})
export class ThemeSettingsComponent implements OnInit {

  layouts = [];
  sidebars = [];

  users: { name: string, title: string }[] = [
    { name: 'Company name 1', title: 'Company name 1' },
    { name: 'Company name 2', title: 'Company name 2' },
    { name: 'Company name 3', title: 'Company name 3' },
    { name: 'Company name 4', title: 'Company name 4' },
    { name: 'Company name 5', title: 'Company name 5' },
  ];

  current_payload: string = null;
  projects: any = null;
  id_project: any = null;
  name_project: any = null;
  list_versions: any = [];
  versions_original_collection: any = [];
  display_form: any = false;

  sidebarEnd = false;
  expanded = false;
  wasExpanded = false;

  constructor(
    protected stateService: StateService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    private pagesComponent: PagesComponent,
    private utilitiesService: UtilitiesService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private layoutService: LayoutService,
    private versionService: VersionService,
    private projectService: ProjectService) {
  }

  ngOnInit() {
    const self = this;
    $(document).ready(function () {
      $('#toggle-settings').on('click', function () {
        const data_project = JSON.parse(sessionStorage.getItem('project'));
        self.id_project = data_project.id_project;
        self.name_project = data_project.name_project;
        self.fnListVersions(self.id_project);
      });
    });

    self.stateService.getLayoutStates().subscribe((layouts: any[]) => self.layouts = layouts);
    self.stateService.getSidebarStates().subscribe((sidebars: any[]) => self.sidebars = sidebars);
    self.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // here we receive a payload from the token and assigne it to our `user` variable
        self.current_payload = token.getValue();
      }
    });
  }

  fnListProjects(current_payload?) {
    let token = (current_payload) ? current_payload : this.current_payload;
    this.projectService.fnHttpGetAllProjects(token).subscribe(r => {
      if (r.status == 200) {
        this.projects = r.body.reverse();
      }
    }, err => {
    });
  }

  fnListVersions(id_project, current_payload?) {
    let token = (current_payload) ? current_payload : this.current_payload;
    this.list_versions = [];
    this.versionService.fnHttpGetAllVersionsProject(token, id_project).subscribe(r => {
      if (r.status == 200) {
        this.list_versions = JSON.parse(JSON.stringify(r.body));
        this.versions_original_collection = JSON.parse(JSON.stringify(r.body));
      }
    }, err => {
    });
  }

  fntProjectNameSelected(project) {
    const self = this;
    if (self.current_payload) {
      sessionStorage.setItem('project.iIDProject', project.iIDProject);
      sessionStorage.setItem('data_company', JSON.stringify(project));
      self.versionService.fnHttpGetVersionDefaultByProject(self.current_payload, project.iIDProject).subscribe(r => {
        if (r.status == 200) {
          self.router.navigate(['/pages/home', r.body.iIDVersion]);
        }
      }, err => {
      });
    }
    $('#toggle-settings').click();
  }

  fntVersionNameSelected(version) {
    this.router.navigate(['/pages/home', version.iIDVersion]);
  }

  toggleSidebar() {
    const self = this;
    self.sidebarService.toggle(true, 'menu-sidebar');
    self.layoutService.changeLayoutSize();
  }

  fnShowListCompany() {
    this.display_form = false;
  }

  fnSaveDataCompany() {
    let data_object = {
      'iIDCompany': 0,
      'tCompanyLogo': 'test1',
      'tCompanyName': 'Test Name Company',
    };
    this.projectService.fnHttpSetSaveNewProject(this.current_payload, data_object).subscribe(r => {
      if (r.status == 200) {
        this.projects = r.body;
      }
    }, err => {
    });
  }

  layoutSelect(layout: any): boolean {
    this.layouts = this.layouts.map((l: any) => {
      l.selected = false;
      return l;
    });

    layout.selected = true;
    this.stateService.setLayoutState(layout);
    return false;
  }

  sidebarSelect(sidebars: any): boolean {
    this.sidebars = this.sidebars.map((s: any) => {
      s.selected = false;
      return s;
    });

    sidebars.selected = true;
    this.stateService.setSidebarState(sidebars);
    return false;
  }

  toggleSettings() {
    this.sidebarService.toggle(false, 'settings-sidebar');
    this.expanded = !this.expanded;
    this.wasExpanded = true;
  }

  fnSetSessionStorageCompanyData() {
  }
}
