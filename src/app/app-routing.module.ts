import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pagina-inicial',
    pathMatch: 'full',
  },
  {
    path: 'pagina-inicial',
    loadChildren: () =>
      import('./pages/pagina-inicial/pagina-inicial.module').then(
        (m) => m.PaginaInicialPageModule
      ),
  },
  {
    path: 'lojas-favoritas',
    loadChildren: () =>
      import('./pages/lojas-favoritas/lojas-favoritas.module').then(
        (m) => m.LojasFavoritasPageModule
      ),
  },
  {
    path: 'definicoes',
    loadChildren: () =>
      import('./pages/definicoes/definicoes.module').then(
        (m) => m.DefinicoesPageModule
      ),
  },
  {
    path: 'informacoes',
    loadChildren: () =>
      import('./pages/informacoes/informacoes.module').then(
        (m) => m.InformacoesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
