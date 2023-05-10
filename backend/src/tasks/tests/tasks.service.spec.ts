import {Test} from '@nestjs/testing';
import {TasksService} from '../tasks.service';

const mockTasksService = () => ({
    getTasks: jest.fn()
});

const mockUser = {
    id: '1',
    email: 'ssd@gmail.com',
    password: 'somePassword'
};

describe('TasksService', () => {
    let tasksService: TasksService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {provide: TasksService, useFactory: mockTasksService}
            ]
        }).compile();

        tasksService = module.get(TasksService);
    });

    describe('getTasks', () => {
        it('calls TasksService.getTasks and returns the result', () => {
            expect(tasksService.getTasks).not.toHaveBeenCalled();
            tasksService.getTasks(null, mockUser);
            expect(tasksService.getTasks).toHaveBeenCalled();
        });
    });
});
