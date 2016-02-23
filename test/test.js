import {
  assert,
  expect
} from './test_helper';

import {searchRoutesByTerm, searchStopsByRouteId, searchDeparturesByRouteId} from '../app/Api';

describe('Api.js', function() {
	
	describe('#searchRoutesByTerm', function(){
		it('should return empty array when the search term is null', function(){
				assert.equal(searchRoutesByTerm(null).length, 0, 'result length equal 0');
		});
		it('should return empty array when the search term is an empty string', () => {
			assert.equal(searchRoutesByTerm('').length, 0, 'result length equal 0');
		});
		it('should bring results if the term is \'lauro\'', () => {
			searchRoutesByTerm('lauro').then((r) => {
				assert.isAbove(r.length, 0, 'result length greater than 0');	
			});			
		});
		it('should not bring results if the term is \'lauronotfounded\'', () => {
			searchRoutesByTerm('lauronotfounded').then((r) => {
				assert.equal(r.length, 0, 'result length equal 0');	
			});			
		});
	});

	describe('#searchStopsByRouteId', function(){
		it('should return empty array when the search term is null', function(){
				assert.equal(searchStopsByRouteId(null).length, 0, 'result length equal 0');
		});
		it('should return empty array when the search term is an empty string', () => {
			assert.equal(searchStopsByRouteId('').length, 0, 'result length equal 0');
		});
		it('should bring results if the routeId is \'17\'', () => {
			searchStopsByRouteId(17).then((r) => {
				assert.isAbove(r.length, 0, 'result length greater than 0');	
			});			
		});
		it('should not bring results if the routeId is \'99999\'', () => {
			searchStopsByRouteId(99999).then((r) => {
				assert.equal(r.length, 0, 'result length equal 0');	
			});			
		});
	});

	describe('#searchDeparturesByRouteId', function(){
		it('should return empty array when the search term is null', function(){
				assert.equal(searchDeparturesByRouteId(null).length, 0, 'result length equal 0');
		});
		it('should return empty array when the search term is an empty string', () => {
			assert.equal(searchDeparturesByRouteId('').length, 0, 'result length equal 0');
		});
		it('should bring results if the routeId is \'17\'', () => {
			searchDeparturesByRouteId(17).then((r) => {
				assert.isAbove(r.length, 0, 'result length greater than 0');	
			});			
		});
		it('should not bring results if the routeId is \'99999\'', () => {
			searchDeparturesByRouteId(99999).then((r) => {
				assert.equal(r.length, 0, 'result length equal 0');	
			});			
		});
	});

});