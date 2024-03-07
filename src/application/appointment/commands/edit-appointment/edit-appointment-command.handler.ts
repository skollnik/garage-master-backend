import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IAppointmentRepository } from "src/domain/appointment/interfaces/appointment.interface";
import { Appointment } from "src/domain/appointment/model/appointment";
import { APPOINTMENT_REPOSITORY } from "../../appointment.constants";
import { EditAppointmentCommand } from "./edit-appointment.command";

@CommandHandler(EditAppointmentCommand)
export class EditAppointmentCommandHandler implements ICommandHandler<EditAppointmentCommand> {
    constructor(
        @Inject(APPOINTMENT_REPOSITORY) private readonly appointmentRepository: IAppointmentRepository,
    ) {}
    
    async execute({id,status}: EditAppointmentCommand) {
        const appointment = await this.appointmentRepository.findById(id);
        Appointment.throwIfNull(appointment);
        const appointmentObject = Appointment.create({id,status});
        await this.appointmentRepository.update(appointmentObject);
    }
}