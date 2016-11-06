import initCreatePage from './create';
import initEditPage from './edit';
import initListPage from './list';

if (window.pageName) {
	switch (pageName) {
		case 'edit':
			initEditPage();
			break;
		case 'list':
			initListPage();
			break;
		case 'create':
			initCreatePage();
			break;
	}
}

//# sourceMappingURL=app-compiled.js.map