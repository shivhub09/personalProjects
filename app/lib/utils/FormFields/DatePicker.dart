import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class DatePicker extends StatelessWidget {
  final ValueChanged<DateTime>? onChanged;
  final DateTime? initialValue;

  DatePicker({Key? key, this.onChanged, this.initialValue}) : super(key: key);

  final TextEditingController _dateController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    if (initialValue != null) {
      _dateController.text = DateFormat('yyyy-MM-dd').format(initialValue!);
    }

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Select a Date",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 20),
          TextFormField(
            controller: _dateController,
            decoration: InputDecoration(
              hintText: 'Select Date',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(color: Colors.grey),
              ),
              contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            ),
            readOnly: true,
            onTap: () async {
              DateTime? pickedDate = await showDatePicker(
                context: context,
                initialDate: initialValue ?? DateTime.now(),
                firstDate: DateTime(2000),
                lastDate: DateTime(2101),
              );
              if (pickedDate != null) {
                _dateController.text = DateFormat('yyyy-MM-dd').format(pickedDate);
                if (onChanged != null) {
                  onChanged!(pickedDate);
                }
              }
            },
          ),
        ],
      ),
    );
  }
}
