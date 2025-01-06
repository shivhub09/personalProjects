import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SelectedPageFormSecondBox extends StatefulWidget {
  final String formId;
  const SelectedPageFormSecondBox({super.key, required this.formId});

  @override
  State<SelectedPageFormSecondBox> createState() =>
      _SelectedPageFormSecondBoxState();
}

class _SelectedPageFormSecondBoxState extends State<SelectedPageFormSecondBox> {
  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Colors.grey, Colors.black],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              spreadRadius: 1,
              blurRadius: 5,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        padding: const EdgeInsets.all(16),
        width: 360,
        height: 120,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              "View All\nNested Forms ",
              style: GoogleFonts.poppins(
                fontWeight: FontWeight.w500,
                fontSize: 22,
                color: Colors.white,
              ),
            ),
            const Icon(
              Icons.view_in_ar_sharp,
              size: 50,
              color: Colors.white,
            )
          ],
        ));
  }
}
