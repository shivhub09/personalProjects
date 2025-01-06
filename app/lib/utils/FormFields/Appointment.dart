import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

class Appointment extends StatefulWidget {
  final String appointmentTitle;
  final DateTime? initialValue;
  final ValueChanged<DateTime?> onChanged;

  const Appointment({
    required this.appointmentTitle,
    this.initialValue,
    required this.onChanged,
  });

  @override
  _AppointmentState createState() => _AppointmentState();
}

class _AppointmentState extends State<Appointment> {
  late TextEditingController _controller;
  DateTime? _selectedDate;

  @override
  void initState() {
    super.initState();
    _selectedDate = widget.initialValue;
    _controller = TextEditingController(
      text: _selectedDate != null
          ? DateFormat('yyyy-MM-dd HH:mm').format(_selectedDate!)
          : '',
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _selectDateTime(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (pickedDate != null) {
      final TimeOfDay? pickedTime = await showTimePicker(
        context: context,
        initialTime: TimeOfDay.fromDateTime(_selectedDate ?? DateTime.now()),
      );
      if (pickedTime != null) {
        setState(() {
          _selectedDate = DateTime(
            pickedDate.year,
            pickedDate.month,
            pickedDate.day,
            pickedTime.hour,
            pickedTime.minute,
          );
          _controller.text =
              DateFormat('yyyy-MM-dd HH:mm').format(_selectedDate!);
          widget.onChanged(_selectedDate);
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(widget.appointmentTitle,
              style: GoogleFonts.poppins(
                  fontWeight: FontWeight.bold, fontSize: 20)),
          SizedBox(height: 8),
          TextFormField(
            controller: _controller,
            readOnly: true,
            decoration: InputDecoration(
              hintText: 'Select Date and Time',
              hintStyle: GoogleFonts.poppins(),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(color: Colors.grey),
              ),
              contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            ),
            onTap: () => _selectDateTime(context),
          ),
        ],
      ),
    );
  }
}
