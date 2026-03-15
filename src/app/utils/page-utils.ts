import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class PageUtils {
    public ScrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
