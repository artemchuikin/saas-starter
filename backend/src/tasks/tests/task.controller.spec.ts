import {Test, TestingModule} from '@nestjs/testing';
import * as uniqid from 'uniqid';
import {TasksController} from '../tasks.controller';
import {TasksService} from '../tasks.service';
import {TaskStatus} from '../task.types';

const uid = uniqid();

describe('TasksController', () => {
    let tasksController: TasksController;
    const mockUser = {
        id: uid,
        email: 'test@gmail.com',
        password: 'Testtesttest12!'
    };

    const mockTasksService = {
        createTask: jest.fn((dto) => {
            return {
                id: Date.now(),
                ...dto,
                status: TaskStatus.OPEN
            };
        })
    };

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [TasksService]
        })
            .overrideProvider(TasksService)
            .useValue(mockTasksService)
            .compile();

        tasksController = moduleRef.get<TasksController>(TasksController);
    });

    it('should be tasksController', () => {
        expect(tasksController).toBeDefined();
    });

    describe('createTask', () => {
        it('calls TasksService.createTask and returns the new task', () => {
            expect(tasksController.createTask(
                {
                    title: 'New Task',
                    description: 'some description'
                },
                mockUser
            )).toEqual({
                id: expect.any(Number),
                title: 'New Task',
                description: 'some description',
                status: 'OPEN'
            });
        });
    });
});
