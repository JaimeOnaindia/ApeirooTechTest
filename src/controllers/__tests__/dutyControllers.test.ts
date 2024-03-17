import supertest from 'supertest';
import app from '../../app';
import Duty from '../../models/duty';

jest.mock('../../config/databaseConfig', () => ({
  result: jest.fn(),
  none: jest.fn(),
  any: jest.fn(),
  oneOrNone: jest.fn(),
}));

import db from '../../config/databaseConfig'


describe('Duties Controller', () => {

  beforeEach(() => {
    jest.mocked(db.none).mockReset();
    jest.mocked(db.any).mockReset();
    jest.mocked(db.oneOrNone).mockReset();
  });

  describe('createDuty', () => {
    it('should create a duty', async () => {
      const dutyData: Duty = { id: 1, name: 'Test Duty' };
      jest.mocked(db.none).mockResolvedValueOnce(null);

      await supertest(app)
        .post('/duties')
        .send(dutyData)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({ created: true, ...dutyData });
        });
    });
    it('should return 400 if the primary key already exists', async () => {
        const dutyData: Duty = { id: 1, name: 'Existing Duty' };
        jest.mocked(db.none).mockRejectedValueOnce({ code: '23505' });
    
        await supertest(app)
          .post('/duties')
          .send(dutyData)
          .expect(400)
          .then((response) => {
            expect(response.body).toEqual({ message: 'La clave primaria ya existe' });
          });
      });
  });

  describe('getAllDuties', () => {
    it('should return all duties', async () => {
      const duties: Duty[] = [{ id: 1, name: 'Test Duty' }];
      jest.mocked(db.any).mockResolvedValueOnce(duties);

      await supertest(app)
        .get('/duties')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(duties);
        });
    });
  });

  describe('getDutyById', () => {
    it('should return a duty by ID', async () => {
      const duty: Duty = { id: 1, name: 'Test Duty' };
      jest.mocked(db.oneOrNone).mockResolvedValueOnce(duty);
  
      await supertest(app)
        .get('/duties/1')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(duty);
        });
    });
  
    it('should return 404 if duty not found', async () => {
      jest.mocked(db.oneOrNone).mockResolvedValueOnce(null);
  
      await supertest(app)
        .get('/duties/999')
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Id not found' });
        });
    });
  });

  describe('updateDuty', () => {
    it('should update a duty', async () => {
      const dutyData: Partial<Duty> = { id: 1, name: 'Updated Duty' };
      jest.mocked(db.none).mockResolvedValueOnce(null);
  
      await supertest(app)
        .put('/duties/1')
        .send(dutyData)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({ created: true, id: '1', name: 'Updated Duty' });
        });
    });
  
    it('should return 400 for invalid input type error', async () => {
      jest.mocked(db.none).mockRejectedValueOnce({ code: '22P02' });
  
      await supertest(app)
        .put('/duties/1')
        .send({ name: 123 })
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Error de inserción de tipo inválido' });
        });
    });
  });
  
  describe('deleteDuty', () => {
    it('should delete a duty', async () => {
      jest.mocked(db.result).mockResolvedValueOnce({ rowCount: 1 });
  
      await supertest(app)
        .delete('/duties/1')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({ deleted: true });
        });
    });
  
    it('should return 404 if duty not found', async () => {
      jest.mocked(db.result).mockResolvedValueOnce({ rowCount: 0 });  
  
      await supertest(app)
        .delete('/duties/999')
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ message: 'Id not found' });
        });
    });
  });
  

});
