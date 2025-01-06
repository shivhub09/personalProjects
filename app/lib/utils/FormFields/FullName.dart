import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FullName extends StatefulWidget {
  final ValueChanged<String>? onChangedFirstName;
  final ValueChanged<String>? onChangedLastName;
  final String? initialFirstName;
  final String? initialLastName;
  final String fullNameTitle;

  FullName({
    Key? key,
    this.onChangedFirstName,
    this.onChangedLastName,
    this.initialFirstName,
    this.initialLastName,
    required this.fullNameTitle,
  }) : super(key: key);

  @override
  _FullNameState createState() => _FullNameState();
}

class _FullNameState extends State<FullName> {
  late TextEditingController firstNameController;
  late TextEditingController lastNameController;

  @override
  void initState() {
    super.initState();
    firstNameController = TextEditingController(text: widget.initialFirstName);
    lastNameController = TextEditingController(text: widget.initialLastName);
  }

  @override
  void dispose() {
    firstNameController.dispose();
    lastNameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.fullNameTitle,
            style:
                GoogleFonts.poppins(fontWeight: FontWeight.bold, fontSize: 20),
          ),
          SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: TextFormField(
                  controller: firstNameController,
                  onChanged: (value) {
                    if (widget.onChangedFirstName != null) {
                      widget.onChangedFirstName!(value);
                    }
                  },
                  decoration: InputDecoration(
                    labelText: 'First Name',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  style: GoogleFonts.poppins(),
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: TextFormField(
                  controller: lastNameController,
                  onChanged: (value) {
                    if (widget.onChangedLastName != null) {
                      widget.onChangedLastName!(value);
                    }
                  },
                  decoration: InputDecoration(
                    labelText: 'Last Name',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  style: GoogleFonts.poppins(),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
