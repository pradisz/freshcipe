import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../@core/services/auth.service';
import { PostService } from '../../@core/services/post.service';
import { UploadService } from '../../@core/services/upload.service';
import { User } from '../../@core/models/user';
import { Recipe } from '../../@core/models/recipe';
import { take } from 'rxjs/operators';
import {
  NbDialogService,
  NbToastrService,
  NbGlobalPhysicalPosition
} from '@nebular/theme';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-edit-post',
  templateUrl: 'edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  user: User;
  recipeId: string;
  postForm: FormGroup;
  coverURL: string | ArrayBuffer;
  fileToUpload: FileList;
  ingredientList: FormArray;
  stepsList: FormArray;
  loading = false;
  constructor(
    private titleService: Title,
    private auth: AuthService,
    private postService: PostService,
    private uploadService: UploadService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    this.auth.user$.pipe(take(1)).subscribe(authUser => {
      this.user = authUser;
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Add Recipe | Freshcipe');

    this.postForm = this.fb.group({
      cover: [null],
      title: ['', Validators.required],
      subtitle: [''],
      prepTime: ['', Validators.required],
      servingAmount: ['', Validators.required],
      description: [''],
      ingredients: this.fb.array([this.createIngredient()]),
      steps: this.fb.array([this.createStep()]),
      author: this.fb.array([this.createUser()])
    });

    this.ingredientList = this.postForm.get('ingredients') as FormArray;
    this.stepsList = this.postForm.get('steps') as FormArray;

    this.recipeId = this.route.snapshot.paramMap.get('id');

    if (this.recipeId) {
      this.postService
        .getRecipeById(this.recipeId)
        .subscribe((recipe: Recipe) => {
          this.titleService.setTitle('Edit Recipe | Freshcipe');
          this.coverURL = recipe.cover;
          this.postForm.get('cover').setValue(recipe.cover);
          this.postForm.get('title').setValue(recipe.title);
          this.postForm.get('subtitle').setValue(recipe.subtitle);
          this.postForm.get('prepTime').setValue(recipe.prepTime);
          this.postForm.get('servingAmount').setValue(recipe.servingAmount);
          this.postForm.get('description').setValue(recipe.description);

          this.removeIngredient(0);
          for (const item of recipe.ingredients) {
            this.ingredientsFormGroup.push(
              this.fb.group({
                ingredient: [
                  item.ingredient,
                  Validators.compose([Validators.required])
                ]
              })
            );
          }

          this.removeStep(0);
          recipe.steps.forEach(item => {
            return this.stepsFormGroup.push(
              this.fb.group({
                step: [item.step, Validators.compose([Validators.required])]
              })
            );
          });
        });
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      const file = event.target.files[0];

      this.fileToUpload = file;

      reader.onload = _ => {
        this.coverURL = reader.result;

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  createUser() {
    return this.fb.group({
      userId: [''],
      username: [''],
      displayName: [''],
      photoURL: ['']
    });
  }

  get ingredientsFormGroup() {
    return this.postForm.get('ingredients') as FormArray;
  }

  createIngredient() {
    return this.fb.group({
      ingredient: ['', Validators.compose([Validators.required])]
    });
  }

  addIngredient() {
    this.ingredientList.push(this.createIngredient());
  }

  removeIngredient(index) {
    this.ingredientList.removeAt(index);
  }

  get stepsFormGroup() {
    return this.postForm.get('steps') as FormArray;
  }

  createStep() {
    return this.fb.group({
      step: ['', Validators.compose([Validators.required])]
    });
  }

  addStep() {
    this.stepsList.push(this.createStep());
  }

  removeStep(index) {
    this.stepsList.removeAt(index);
  }

  async submitRecipe() {
    this.loading = true;

    this.postForm.value.author = {
      userId: this.user.uid,
      username: this.user.username,
      displayName: this.user.displayName,
      email: this.user.email,
      photoURL: this.user.photoURL
    };

    // upload file
    if (this.fileToUpload) {
      const upload = await this.uploadService.saveCoverPost(this.fileToUpload);
      this.postForm.value.cover = await upload.ref.getDownloadURL();
    }

    if (this.recipeId) {
      // update recipe
      await this.postService.updateRecipe(this.recipeId, this.postForm.value);
      this.loading = false;
      this.router.navigate(['/recipe', this.recipeId]);
    } else {
      // post recipe
      const post = await this.postService.submitRecipe(this.postForm.value);
      this.loading = false;
      this.router.navigate(['/recipe', post.id]);
    }
  }

  cancel() {
    window.history.back();
  }

  deleteRecipe() {
    const dialogRef = this.dialogService.open(ConfirmDialogComponent, {
      autoFocus: false
    });

    dialogRef.componentRef.instance.mainTitle = 'Are you sure ?';
    dialogRef.componentRef.instance.confirmTitle = 'Delete';
    dialogRef.onClose.pipe(take(1)).subscribe(async deleteRecipe => {
      if (deleteRecipe) {
        await this.postService.deleteRecipe(this.recipeId);
        this.toastrService.success('', 'Recipe has been successfully deleted', {
          hasIcon: false,
          position: NbGlobalPhysicalPosition.BOTTOM_LEFT
        });
        this.router.navigate(['/user', this.user.username]);
      }
    });
  }
}
